/**
 * Umesh Portfolio — Appwrite blog backend setup.
 *
 * Adds a `blogs` collection, a `blog_images` bucket and a `bloggers` team to
 * the SAME Appwrite project + database used by SajhaSwayamsewak
 * (see SajhaSwayamsewak/lib/migration/run_migration_v2.dart for the sibling
 * script). Nothing that already exists there — users, events, applications,
 * the `sajha-files` bucket, etc. — is read, modified, or touched in any way;
 * this script only ever creates new IDs (`blogs`, `blog_images`, `bloggers`).
 *
 * Safe to run repeatedly: every step checks for what it needs before
 * creating it, so re-running only fills in what's missing.
 *
 *   cp .env.example .env      # fill in APPWRITE_API_KEY and BLOGGER_EMAIL
 *   npm run setup:appwrite
 *
 * The API key here is a server-only secret — it must stay in `.env`
 * (already gitignored) and must NEVER be given a REACT_APP_ prefix, or
 * react-scripts will bundle it straight into the public JS build.
 */

import { config } from "dotenv";
import { Client, Databases, Storage, Teams, Users, Permission, Role, Query, DatabasesIndexType } from "node-appwrite";

config({ path: ".env" });

const DRY_RUN = process.argv.includes("--dry");

const ENDPOINT = process.env.APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID || "6996beb90002219bff63";
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "6996bfd50005e4ecb093";
const COLLECTION_ID = process.env.BLOG_COLLECTION_ID || "blogs";
const BUCKET_ID = process.env.BLOG_BUCKET_ID || "blog_images";
const TEAM_ID = process.env.BLOG_TEAM_ID || "bloggers";
const BLOGGER_EMAIL = process.env.BLOGGER_EMAIL;

const ok = (msg) => console.log(`   \x1b[32m✓\x1b[0m ${msg}`);
const add = (msg) => console.log(`     \x1b[36m+\x1b[0m ${msg}`);
const skip = (msg) => console.log(`     \x1b[90m~ ${msg}\x1b[0m`);
const warn = (msg) => console.log(`     \x1b[33m⚠\x1b[0m ${msg}`);
const head = (msg) => console.log(`\n\x1b[1m${msg}\x1b[0m`);

const alreadyExists = (err) => err?.code === 409 || /already exists/i.test(err?.message ?? "");

function requireEnv() {
  const missing = Object.entries({ APPWRITE_API_KEY: API_KEY }).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) {
    console.error(`\n✗ Missing environment variables: ${missing.join(", ")}`);
    console.error("  Copy .env.example to .env and fill them in, then run again.\n");
    process.exit(1);
  }
}

const client = new Client();
const databases = new Databases(client);
const storage = new Storage(client);
const teams = new Teams(client);
const users = new Users(client);

/* ------------------------------------------------------------------ */
/* Attribute helpers — mirror SajhaSwayamsewak's Dart migration 1:1    */
/* ------------------------------------------------------------------ */

async function ensureCollection() {
  head(`📋 Collection "${COLLECTION_ID}"`);
  try {
    await databases.getCollection({ databaseId: DATABASE_ID, collectionId: COLLECTION_ID });
    ok("exists");
    return;
  } catch {
    if (DRY_RUN) return add(`would create collection ${COLLECTION_ID}`);
    // documentSecurity: true — read/update/delete are governed per-document
    // (see blogs.js: draft posts grant read only to the bloggers team,
    // published posts additionally grant Role.any()). Only "create" is
    // granted here, at the collection level, since document permissions
    // can't gate who is allowed to create a new document in the first place.
    await databases.createCollection({
      databaseId: DATABASE_ID,
      collectionId: COLLECTION_ID,
      name: "blogs",
      permissions: [Permission.create(Role.team(TEAM_ID))],
      documentSecurity: true,
    });
    ok("created");
  }
}

async function str(key, size, { required = false, xdefault } = {}) {
  if (DRY_RUN) return add(`${key} (string)`);
  try {
    await databases.createStringAttribute({
      databaseId: DATABASE_ID,
      collectionId: COLLECTION_ID,
      key,
      size,
      required,
      xdefault,
    });
    add(`${key} (string)`);
  } catch (err) {
    if (alreadyExists(err)) skip(`${key} already exists`);
    else warn(`${key}: ${err.message}`);
  }
}

async function strArray(key, size) {
  if (DRY_RUN) return add(`${key} (string[])`);
  try {
    await databases.createStringAttribute({
      databaseId: DATABASE_ID,
      collectionId: COLLECTION_ID,
      key,
      size,
      required: false,
      array: true,
    });
    add(`${key} (string[])`);
  } catch (err) {
    if (alreadyExists(err)) skip(`${key} already exists`);
    else warn(`${key}: ${err.message}`);
  }
}

async function waitForAttributes() {
  console.log("     ⏳ waiting for attributes to be ready…");
  if (!DRY_RUN) await new Promise((r) => setTimeout(r, 4000));
}

async function index(key, type, attributes) {
  if (DRY_RUN) return add(`index ${key}`);
  try {
    await databases.createIndex({ databaseId: DATABASE_ID, collectionId: COLLECTION_ID, key, type, attributes });
    add(`index ${key} [${attributes.join(", ")}]`);
  } catch (err) {
    if (alreadyExists(err)) skip(`index ${key} already exists`);
    else warn(`index ${key}: ${err.message}`);
  }
}

async function setupBlogAttributes() {
  await str("title", 200, { required: true });
  await str("slug", 220, { required: true });
  await str("excerpt", 500);
  await str("content", 1000000, { required: true }); // Quill HTML output
  await str("coverImageUrl", 500);
  await str("author", 120, { required: true });
  await str("authorUserId", 64, { required: true });
  await str("category", 100);
  await strArray("tags", 50);
  // Not `required`: Appwrite rejects a default value on a required attribute,
  // and a default is what makes a doc created outside the app default safely
  // to DRAFT. The app always sets this explicitly on create/update anyway.
  await str("status", 20, { xdefault: "DRAFT" }); // DRAFT | PUBLISHED
  await str("metaDescription", 300);
  await str("publishedAt", 50); // ISO string, set when status -> PUBLISHED

  await waitForAttributes();

  await index("slug_unique", DatabasesIndexType.Unique, ["slug"]);
  await index("status_index", DatabasesIndexType.Key, ["status"]);
  await index("category_index", DatabasesIndexType.Key, ["category"]);
}

/* ------------------------------------------------------------------ */
/* Storage bucket                                                      */
/* ------------------------------------------------------------------ */

async function ensureBucket() {
  head(`🪣 Storage bucket "${BUCKET_ID}"`);
  try {
    await storage.getBucket({ bucketId: BUCKET_ID });
    ok("exists");
    return;
  } catch {
    if (DRY_RUN) return add(`would create bucket ${BUCKET_ID}`);
    await storage.createBucket({
      bucketId: BUCKET_ID,
      name: "blog-images",
      permissions: [
        Permission.read(Role.any()),
        Permission.create(Role.team(TEAM_ID)),
        Permission.update(Role.team(TEAM_ID)),
        Permission.delete(Role.team(TEAM_ID)),
      ],
      fileSecurity: false,
      maximumFileSize: 8 * 1024 * 1024, // 8 MB
      allowedFileExtensions: ["jpg", "jpeg", "png", "webp", "gif"],
    });
    ok("created");
  }
}

/* ------------------------------------------------------------------ */
/* Bloggers team                                                       */
/* ------------------------------------------------------------------ */

async function ensureTeamAndMember() {
  head(`👤 Team "${TEAM_ID}"`);
  try {
    await teams.get({ teamId: TEAM_ID });
    ok("exists");
  } catch {
    if (DRY_RUN) return add(`would create team ${TEAM_ID}`);
    await teams.create({ teamId: TEAM_ID, name: "Bloggers" });
    ok("created");
  }

  if (!BLOGGER_EMAIL) {
    warn("BLOGGER_EMAIL not set — add it to .env and re-run to grant blog access to that account");
    return;
  }

  if (DRY_RUN) return add(`would add ${BLOGGER_EMAIL} to ${TEAM_ID}`);

  const found = await users.list({ queries: [Query.equal("email", BLOGGER_EMAIL)] });
  if (found.total === 0) {
    warn(`no Appwrite user found with email ${BLOGGER_EMAIL} — log in to the app with that account first`);
    return;
  }

  const userId = found.users[0].$id;
  try {
    await teams.createMembership({ teamId: TEAM_ID, userId, roles: ["editor"] });
    ok(`added ${BLOGGER_EMAIL} to ${TEAM_ID}`);
  } catch (err) {
    if (alreadyExists(err)) skip(`${BLOGGER_EMAIL} already a member`);
    else warn(`could not add ${BLOGGER_EMAIL}: ${err.message}`);
  }
}

/* ------------------------------------------------------------------ */

async function main() {
  console.log("\n\x1b[1m📝  Umesh Portfolio — Appwrite blog setup\x1b[0m");
  console.log("─".repeat(48));
  requireEnv();

  client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);

  console.log(`   endpoint    ${ENDPOINT}`);
  console.log(`   project     ${PROJECT_ID}`);
  console.log(`   database    ${DATABASE_ID}  (shared with SajhaSwayamsewak — untouched)`);
  console.log(`   collection  ${COLLECTION_ID}  (new)`);
  console.log(`   bucket      ${BUCKET_ID}  (new)`);
  if (DRY_RUN) console.log("\n   \x1b[33mDRY RUN — nothing will be written\x1b[0m");

  await ensureCollection();
  await setupBlogAttributes();
  await ensureBucket();
  await ensureTeamAndMember();

  console.log("\n\x1b[32m✅ Blog backend ready.\x1b[0m");
  console.log("   Next: fill in the REACT_APP_* vars in .env, then npm start\n");
}

main().catch((err) => {
  console.error(`\n\x1b[31m❌ Setup failed:\x1b[0m ${err.message}`);
  if (process.env.DEBUG) console.error(err);
  process.exit(1);
});
