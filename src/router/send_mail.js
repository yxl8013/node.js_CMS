const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: '1007206810@qq.com', //发送方的邮箱
            pass: 'hizkwmwelssebegh'// stmp授权码
        }
    });
   


function sendmail(email,code,callback){
 // 发送配置项
    let mailOptions = {
        from: '"Fred Foo 👻" <1007206810@qq.com>', //  发送方邮箱
        to:email, //  接受方邮箱
        subject: '邮箱注册验证', //  标题
        text: '邮箱验证码', // 文本
        html: `<p>你的邮箱验证码是:<h3>${code}</h3>请注意验证码安全,验证码有效期5分钟.</p>` //  页面内容
    };

    // 发送函数
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
           callback(-1);
        }
        callback(0);

    });
}
// sendmail('1007206810qq.com',"1313");
// sendmail('1007206810@qq.com',8013);
module.exports ={sendmail};