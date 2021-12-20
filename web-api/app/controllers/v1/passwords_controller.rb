class V1::PasswordsController < ApplicationController
  skip_before_action :authorize_request

  def forgot
    user = User.find_by_email(params[:email])
    if user
      user.send_password_reset
    end
    # this response is sent regardless of whether a user is found for security reasons
    json_response({alert: "If this user exists, we have sent you a password reset email."})
  end

  def reset
    token = params[:token]
    email = params[:email]
    password = params[:password]
    user = User.find_by(password_reset_token: token, email: email)
    if user.present? && user.password_token_valid?
      if user.reset_password(password)
        json_response({alert: "Your password has been successfully reset!"})
        session[:user_id] = user.id
      else
        json_response({error: user.errors.full_messages}, :unprocessable_entity)
      end
    else
      json_response({error: ['Link not valid or expired. Try generating a new link.']}, :not_found)
    end
  end
end
