const nodemailer = require('nodemailer')
const { EMAIL, AUTHORIZATION_CODE } = require('../ENV.js')

const email = async ({ title = '', content = '' } = {}) => {
  try {
    const suffix = /@(?<suffix>.*)/.exec(EMAIL).groups.suffix
    const options = {
      host: `smtp.${suffix}`,
      port: 465,
      secure: true,
      auth: {
        user: EMAIL,
        pass: AUTHORIZATION_CODE,
      },
    }
    const transporter = nodemailer.createTransport(options)

    await transporter.verify()

    return transporter.sendMail({
      from: `稀土掘金助手 <${EMAIL}>`,
      to: EMAIL,
      subject: title,
      html: content,
    })
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = email
