const ONESIGNAL_API_KEY = "os_v2_app_xmzxpa3xq5hs7de7bxmzj4wm6u3jmnxsifkusu4rwof2amon5t2ckgxqw43cdll4ykwmfp5s5i5257sblztfoigdzbeiigmtr347fpi";
const ONESIGNAL_APP_ID = "bb337783-7787-4f2f-8c9f-0dd994f2ccf5";
const TEMPLATE_ID = "bfedc260-4914-4a37-b77d-3d740ed13126";

export const sendContactEmail = async (formData) => {
  const body = {
    app_id: ONESIGNAL_APP_ID,
    template_id: TEMPLATE_ID,
    email_from_name: "Umesh Protfolio Website",
    email_from_address: "dale@umesh-shahi.com.np",
    email_sender_domain: "mail.umesh-shahi.com.np",
    include_unsubscribed: true,
    disable_email_click_tracking: false,
    name: "Contact Email",
    email_to: [
      "thakuriumesh919@gmail.com"
    ],
    custom_data: {
      name: formData.name,
      email: formData.email, 
      message: formData.message,
    }
  };

  try {
    const response = await fetch("https://api.onesignal.com/notifications?c=email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${ONESIGNAL_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data };
    }
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, error: error.message };
  }
};
