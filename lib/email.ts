import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Convert the WhiteBackIcon SVG to a data URL for email compatibility
const logoDataUrl = `data:image/svg+xml;base64,${Buffer.from(`
<svg width="569" height="569" viewBox="0 0 569 569" xmlns="http://www.w3.org/2000/svg" xml:space="preserve">
  <g transform="translate(-891 -798)">
    <path d="M891 1014.05C891 894.731 987.731 798 1107.05 798L1243.95 798C1363.27 798 1460 894.731 1460 1014.05L1460 1150.95C1460 1270.27 1363.27 1367 1243.95 1367L1107.05 1367C987.731 1367 891 1270.27 891 1150.95Z" fill-rule="evenodd"/>
    <path d="M1317.69 1200.94C1305.13 1200.94 1294.94 1211.13 1294.94 1223.69L1294.94 1242.31C1294.94 1254.87 1305.13 1265.06 1317.69 1265.06L1336.31 1265.06C1348.87 1265.06 1359.06 1254.87 1359.06 1242.31L1359.06 1223.69C1359.06 1211.13 1348.87 1200.94 1336.31 1200.94ZM1311.03 1178 1342.97 1178C1364.53 1178 1382 1195.47 1382 1217.03L1382 1248.97C1382 1270.53 1364.53 1288 1342.97 1288L1311.03 1288C1289.47 1288 1272 1270.53 1272 1248.97L1272 1217.03C1272 1195.47 1289.47 1178 1311.03 1178Z" fill="#FFFFFF" fill-rule="evenodd"/>
    <path d="M1120.67 889 1233.33 889C1309.36 889 1371 950.637 1371 1026.67L1371 1138.5 1369.08 1138.31 1306.71 1138.31C1301.45 1138.31 1296.31 1138.84 1291.35 1139.86L1285.43 1141.7 1288.44 1132C1289.51 1126.78 1290.07 1121.37 1290.07 1115.83L1290.07 1050.17C1290.07 1005.86 1254.14 969.931 1209.83 969.931L1144.17 969.931C1099.86 969.931 1063.93 1005.86 1063.93 1050.17L1063.93 1115.83C1063.93 1160.14 1099.86 1196.07 1144.17 1196.07L1209.83 1196.07C1215.37 1196.07 1220.78 1195.51 1226 1194.44L1234.32 1191.86 1232.05 1199.16C1231.03 1204.13 1230.5 1209.26 1230.5 1214.52L1230.5 1276.89 1230.51 1277 1120.67 1277C1044.64 1277 983 1215.36 983 1139.33L983 1026.67C983 950.637 1044.64 889 1120.67 889Z" fill="#FBC90E" fill-rule="evenodd"/>
  </g>
</svg>
`).toString('base64')}`;

interface PaymentEmailParams {
  userName: string;
  recipientName: string;
  paymentId: string;
  amount: number;
  itemName: string;
  itemType: 'certification' | 'course';
  feedback?: string;
}

// Common email template parts
const emailHeader = `
  <img src="${logoDataUrl}" alt="QonnectEd Logo" style="width: 200px; height: auto; margin-bottom: 30px; display: block; margin-right: auto; margin-left: auto;">
`;

const emailWrapper = (content: string) => `
  <!DOCTYPE html>
  <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');
        body {
          font-family: 'Tajawal', Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          margin: 0;
          padding: 0;
          text-align: right;
        }
        table {
          direction: rtl;
        }
        td {
          text-align: right !important;
        }
        td:last-child {
          text-align: left !important;
        }
      </style>
    </head>
    <body style="background-color: #f6f9fc;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          ${emailHeader}
          ${content}
        </div>
        <div style="text-align: center; margin-top: 30px; color: #666666; font-size: 14px;">
          <p>© ${new Date().getFullYear()} QonnectEd. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </body>
  </html>
`;

export async function sendPaymentApprovedEmail({
  userName,
  recipientName,
  paymentId,
  amount,
  itemName,
  itemType,
  feedback
}: PaymentEmailParams) {
  const subject = itemType === 'certification' 
    ? 'تم قبول طلب الشهادة'
    : 'تم قبول طلب التسجيل في الدورة';

  const message = `
    مرحباً ${recipientName}،

    نود إعلامك بأنه تم قبول طلب الدفع الخاص بك.

    تفاصيل الطلب:
    - رقم الطلب: ${paymentId}
    - ${itemType === 'certification' ? 'الشهادة' : 'الدورة'}: ${itemName}
    - المبلغ: ${amount} د.ع

    ${feedback ? `ملاحظات: ${feedback}` : ''}

    شكراً لك،
    فريق QonnectEd
  `;

  try {
    console.log('Attempting to send approval email:', {
      to: userName,
      recipientName,
      paymentId,
      apiKeyExists: !!process.env.RESEND_API_KEY
    });

    const emailContent = `
      <div style="text-align: right;">
        <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 30px;">
          مرحباً ${recipientName}،
        </h1>
        
        <div style="background-color: #f8f9fa; border-right: 4px solid #28a745; padding: 20px; margin: 30px 0; border-radius: 8px;">
          <p style="color: #28a745; font-size: 18px; font-weight: bold; margin: 0;">
            ${message}
          </p>
        </div>

        <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <p style="color: #2e7d32; margin: 0;">
            يمكنك الآن البدء في دورتك التدريبية. نتمنى لك تجربة تعليمية ممتعة ومفيدة.
          </p>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="margin: 0; color: #666666;">مع أطيب التحيات،</p>
          <p style="margin: 5px 0 0; color: #1a1a1a; font-weight: bold;">فريق QonnectEd</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'QonnectEd <onboarding@resend.dev>',
      to: [userName],  // Send to email address
      subject: subject,
      html: emailWrapper(emailContent),
    });

    if (error) {
      console.error('Resend API returned an error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending approval email:', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error };
  }
}

export async function sendPaymentRejectedEmail({
  userName,
  recipientName,
  paymentId,
  amount,
  itemName,
  itemType,
  feedback
}: PaymentEmailParams) {
  const subject = itemType === 'certification'
    ? 'تم رفض طلب الشهادة'
    : 'تم رفض طلب التسجيل في الدورة';

  const message = `
    مرحباً ${recipientName}،

    نأسف لإعلامك بأنه تم رفض طلب الدفع الخاص بك.

    تفاصيل الطلب:
    - رقم الطلب: ${paymentId}
    - ${itemType === 'certification' ? 'الشهادة' : 'الدورة'}: ${itemName}
    - المبلغ: ${amount} د.ع

    ${feedback ? `سبب الرفض: ${feedback}` : ''}

    يرجى التواصل مع الدعم الفني إذا كان لديك أي استفسار.

    شكراً لك،
    فريق QonnectEd
  `;

  try {
    console.log('Attempting to send rejection email:', {
      to: userName,
      recipientName,
      paymentId,
      apiKeyExists: !!process.env.RESEND_API_KEY
    });

    const emailContent = `
      <div style="text-align: right;">
        <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 30px;">
          مرحباً ${recipientName}،
        </h1>
        
        <div style="background-color: #fff3f3; border-right: 4px solid #dc3545; padding: 20px; margin: 30px 0; border-radius: 8px;">
          <p style="color: #dc3545; font-size: 18px; font-weight: bold; margin: 0;">
            ${message}
          </p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 15px 0;">
            يرجى مراجعة الملاحظات أعلاه وإعادة تقديم الدفع إذا كنت ترغب في ذلك.
          </p>
          <p style="margin: 0;">
            إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا.
          </p>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="margin: 0; color: #666666;">مع أطيب التحيات،</p>
          <p style="margin: 5px 0 0; color: #1a1a1a; font-weight: bold;">فريق QonnectEd</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'QonnectEd <onboarding@resend.dev>',
      to: [userName],  // Send to email address
      subject: subject,
      html: emailWrapper(emailContent),
    });

    if (error) {
      console.error('Resend API returned an error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending rejection email:', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error };
  }
} 