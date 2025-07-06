import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Common styles
const styles = {
  container: 'max-width: 600px; margin: 0 auto; padding: 20px;',
  header: 'background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center; margin-bottom: 20px;',
  body: 'background-color: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px;',
  title: 'color: #1a1a1a; font-size: 24px; margin-bottom: 10px;',
  subtitle: 'color: #4a4a4a; font-size: 16px; margin-bottom: 20px;',
  detailsBox: 'background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);',
  detailsTitle: 'color: #1a1a1a; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #FFD700; padding-bottom: 8px;',
  detailsList: 'list-style: none; padding: 0; margin: 0;',
  detailsItem: 'padding: 8px 0; border-bottom: 1px solid #eee; color: #4a4a4a;',
  button: 'display: inline-block; padding: 12px 24px; background-color: #FFD700; color: #1a1a1a; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px;',
  footer: 'text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666;',
  logo: 'width: 150px; height: auto; margin-bottom: 15px; border-radius: 10px;',
};

// Email template for notifying admin about new payment
export const getAdminNotificationEmailTemplate = (userName: string, paymentId: string, paymentDetails: any) => {
  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; ${styles.container}">
      <div style="${styles.header}">
        <img src="https://res.cloudinary.com/dc1omolee/image/upload/v1751816106/payment-proofs/PAY-5ijoxqsz0.jpg" alt="Qonnected Academy" style="${styles.logo}" />
        <h2 style="${styles.title}">طلب دفع جديد</h2>
        <p style="${styles.subtitle}">تم استلام طلب دفع جديد يحتاج إلى مراجعة</p>
      </div>
      
      <div style="${styles.body}">
        <div style="${styles.detailsBox}">
          <h3 style="${styles.detailsTitle}">معلومات المستخدم</h3>
          <ul style="${styles.detailsList}">
            <li style="${styles.detailsItem}">🧑‍💼 اسم المستخدم: ${userName}</li>
            <li style="${styles.detailsItem}">📧 البريد الإلكتروني: ${paymentDetails.userEmail}</li>
          </ul>
        </div>

        <div style="${styles.detailsBox}">
          <h3 style="${styles.detailsTitle}">تفاصيل الدفع</h3>
          <ul style="${styles.detailsList}">
            <li style="${styles.detailsItem}">🔢 رقم الدفع: ${paymentId}</li>
            <li style="${styles.detailsItem}">💰 المبلغ: ${paymentDetails.amount}</li>
            <li style="${styles.detailsItem}">📝 نوع الطلب: ${paymentDetails.itemType === 'course' ? 'دورة' : 'شهادة'}</li>
            <li style="${styles.detailsItem}">📚 اسم ${paymentDetails.itemType === 'course' ? 'الدورة' : 'الشهادة'}: ${paymentDetails.itemName}</li>
            <li style="${styles.detailsItem}">📅 تاريخ الطلب: ${new Date().toLocaleDateString('ar-IQ')}</li>
          </ul>
        </div>

          <a href="https://qonnectedacademy.com/admin/" style="${styles.button}">
            مراجعة الطلب في لوحة التحكم
        </a>

        <div style="${styles.footer}">
          <p>هذا البريد تم إرساله تلقائياً من نظام Qonnected Academy</p>
        </div>
      </div>
    </div>
  `;
};

// Email template for payment result notification to user
export const getPaymentResultEmailTemplate = (
  userName: string, 
  paymentId: string, 
  paymentDetails: any, 
  isApproved: boolean,
  reason?: string
) => {
  const statusColor = isApproved ? '#28a745' : '#dc3545';
  const statusEmoji = isApproved ? '✅' : '❌';
  const statusText = isApproved ? 'تم قبول طلب الدفع' : 'تم رفض طلب الدفع';

  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; ${styles.container}">
      <div style="${styles.header}">
        <img src="" alt="Qonnected Academy" style="${styles.logo}" />
        <h2 style="${styles.title}">
          <span style="color: ${statusColor}">${statusEmoji} ${statusText}</span>
        </h2>
        <p style="${styles.subtitle}">مرحباً ${userName}</p>
      </div>
      
      <div style="${styles.body}">
        <div style="${styles.detailsBox}">
          <h3 style="${styles.detailsTitle}">تفاصيل الطلب</h3>
          <ul style="${styles.detailsList}">
            <li style="${styles.detailsItem}">🔢 رقم الدفع: ${paymentId}</li>
            <li style="${styles.detailsItem}">💰 المبلغ: ${paymentDetails.amount}</li>
            <li style="${styles.detailsItem}">📝 نوع الطلب: ${paymentDetails.itemType === 'course' ? 'دورة' : 'شهادة'}</li>
            <li style="${styles.detailsItem}">📚 اسم ${paymentDetails.itemType === 'course' ? 'الدورة' : 'الشهادة'}: ${paymentDetails.itemName}</li>
          </ul>
        </div>

        ${isApproved ? `
          <div style="${styles.detailsBox}">
            <h3 style="${styles.detailsTitle}">الخطوات التالية</h3>
            <ul style="${styles.detailsList}">
              <li style="${styles.detailsItem}">✨ تم تفعيل حسابك للوصول إلى المحتوى</li>
              <li style="${styles.detailsItem}">📚 يمكنك الآن الوصول إلى المحتوى الخاص بك</li>
              <li style="${styles.detailsItem}">💡 ابدأ رحلة التعلم الخاصة بك</li>
            </ul>
            <a href="https://your-platform-url.com/dashboard" style="${styles.button}">
              الذهاب إلى المنصة
            </a>
          </div>
        ` : `
          <div style="${styles.detailsBox}">
            <h3 style="${styles.detailsTitle}">سبب الرفض</h3>
            <p style="color: #dc3545; margin: 10px 0;">${reason || 'لم يتم تحديد سبب'}</p>
            <p>إذا كان لديك أي استفسارات، يرجى التواصل معنا عبر:</p>
            <ul style="${styles.detailsList}">
              <li style="${styles.detailsItem}">📧 البريد الإلكتروني: support@qonnectedacademy.com</li>
              <li style="${styles.detailsItem}">📱 الهاتف: +1234567890</li>
            </ul>
          </div>
        `}

        <div style="${styles.footer}">
          <p>شكراً لك،<br>فريق Qonnected Academy</p>
          <small>هذا البريد تم إرساله تلقائياً، يرجى عدم الرد عليه</small>
        </div>
      </div>
    </div>
  `;
};

// Send notification to admin about new payment
export const sendAdminNotificationEmail = async (
  userName: string,
  paymentId: string,
  paymentDetails: any
) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // Temporary until domain verification
      to: 'info@qonnectedacademy.com', // Admin email
      subject: '🔔 طلب دفع جديد - Qonnected Academy',
      html: getAdminNotificationEmailTemplate(userName, paymentId, paymentDetails),
      replyTo: "info@qonnectedacademy.com" // Add reply-to address
    });
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { success: false, error };
  }
};

// Send payment result notification to user
export const sendPaymentResultEmail = async (
  userName: string,
  userEmail: string,
  paymentId: string,
  paymentDetails: any,
  isApproved: boolean,
  reason?: string
) => {
  try {
    const response = await resend.emails.send({
      from:  "Qonnected Academy <info@qonnectedacademy.com>",
      to: userEmail,
      subject: `${isApproved ? '✅ تم قبول' : '❌ تم رفض'} طلب الدفع - Qonnected Academy`,
      html: getPaymentResultEmailTemplate(userName, paymentId, paymentDetails, isApproved, reason),
      replyTo: "info@qonnectedacademy.com" // Add reply-to address
    });
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending payment result email:', error);
    return { success: false, error };
  }
}; 