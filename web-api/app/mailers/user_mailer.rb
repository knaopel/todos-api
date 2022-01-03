class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.password_reset.subject
  #
  def password_reset(user)
    @user = user
    mail to: user.email, subject: "Password Reset"
  end

  def invite_user(user, honey_or_dewer, inviter)
    @user = user
    @honey_or_dewer = honey_or_dewer
    @inviter = inviter
    mail to: user.email, subject: "Invitation to Honey Dew"
  end
end
