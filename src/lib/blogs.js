import {
  databases,
  storage,
  DATABASE_ID,
  BLOG_COLLECTION_ID,
  BLOG_BUCKET_ID,
  BLOG_TEAM_ID,
  ID,
  Query,
  Permission,
  Role,
} from "./appwrite";

export const STATUS = { DRAFT: "DRAFT", PUBLISHED: "PUBLISHED" };

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatBlogDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function estimateReadTime(html) {
  const words = (html || "").replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Draft posts are only readable by the bloggers team; published posts are
// additionally readable by anyone. Recomputed on every write so a status
// change immediately changes who can read the document.
function permissionsFor(status) {
  const perms = [Permission.update(Role.team(BLOG_TEAM_ID)), Permission.delete(Role.team(BLOG_TEAM_ID))];
  if (status === STATUS.PUBLISHED) {
    perms.push(Permission.read(Role.any()));
  } else {
    perms.push(Permission.read(Role.team(BLOG_TEAM_ID)));
  }
  return perms;
}

export async function listPublishedBlogs({ limit = 20, offset = 0, category } = {}) {
  const queries = [
    Query.equal("status", STATUS.PUBLISHED),
    Query.orderDesc("publishedAt"),
    Query.limit(limit),
    Query.offset(offset),
  ];
  if (category) queries.push(Query.equal("category", category));
  return databases.listDocuments({ databaseId: DATABASE_ID, collectionId: BLOG_COLLECTION_ID, queries });
}

export async function getBlogBySlug(slug) {
  const res = await databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: BLOG_COLLECTION_ID,
    queries: [Query.equal("slug", slug), Query.limit(1)],
  });
  return res.documents[0] ?? null;
}

export async function getBlogById(id) {
  return databases.getDocument({ databaseId: DATABASE_ID, collectionId: BLOG_COLLECTION_ID, documentId: id });
}

export async function getRelatedBlogs(excludeId, limit = 4) {
  const res = await listPublishedBlogs({ limit: limit + 1 });
  return res.documents.filter((doc) => doc.$id !== excludeId).slice(0, limit);
}

// Relies on Appwrite's own permission filtering: a bloggers-team member sees
// every document (drafts via the team grant, published via Role.any()), no
// separate "mine" filter needed.
export async function listAllBlogs() {
  return databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: BLOG_COLLECTION_ID,
    queries: [Query.orderDesc("$createdAt"), Query.limit(100)],
  });
}

export async function createBlog(data, authorUser) {
  const status = data.status === STATUS.PUBLISHED ? STATUS.PUBLISHED : STATUS.DRAFT;
  const payload = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || "",
    content: data.content || "",
    coverImageUrl: data.coverImageUrl || "",
    author: data.author || authorUser.name || authorUser.email,
    authorUserId: authorUser.$id,
    category: data.category || "",
    tags: data.tags || [],
    status,
    metaDescription: data.metaDescription || "",
    publishedAt: status === STATUS.PUBLISHED ? new Date().toISOString() : "",
  };
  return databases.createDocument({
    databaseId: DATABASE_ID,
    collectionId: BLOG_COLLECTION_ID,
    documentId: ID.unique(),
    data: payload,
    permissions: permissionsFor(status),
  });
}

export async function updateBlog(id, data, existing) {
  const status = data.status === STATUS.PUBLISHED ? STATUS.PUBLISHED : STATUS.DRAFT;
  const wasPublished = existing.status === STATUS.PUBLISHED;
  const payload = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || "",
    content: data.content || "",
    coverImageUrl: data.coverImageUrl || "",
    category: data.category || "",
    tags: data.tags || [],
    status,
    metaDescription: data.metaDescription || "",
    publishedAt: status === STATUS.PUBLISHED ? existing.publishedAt || new Date().toISOString() : "",
  };
  if (status === STATUS.PUBLISHED && !wasPublished) {
    payload.publishedAt = new Date().toISOString();
  }
  return databases.updateDocument({
    databaseId: DATABASE_ID,
    collectionId: BLOG_COLLECTION_ID,
    documentId: id,
    data: payload,
    permissions: permissionsFor(status),
  });
}

export async function deleteBlog(id) {
  return databases.deleteDocument({ databaseId: DATABASE_ID, collectionId: BLOG_COLLECTION_ID, documentId: id });
}

export async function uploadBlogImage(file) {
  const uploaded = await storage.createFile({ bucketId: BLOG_BUCKET_ID, fileId: ID.unique(), file });
  return storage.getFileView({ bucketId: BLOG_BUCKET_ID, fileId: uploaded.$id });
}
