class UsersController < ApplicationController
  skip_before_action :authorize_request, only: [:create, :accept_invitation]
  # POST /signup
  # return authenticated token upon sign-up
  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = { message: Message.account_created, auth_token: auth_token }
    json_response(response, :created)
  end

  # POST /accept_invitation/:token
  def accept_invitation
    user = User.find_by(password_reset_token: params[:token])
    if user
      user.accept_invitation(params[:name], params[:password])
      auth_token = AuthenticateUser.new(user.email, user.password).call
      response = { message: Message.invitation_accepted, auth_token: auth_token}
      json_response(response)
    else
      json_response({error: Message.invalid_token }, :unprocessable_entity)
    end
  end

  private

  def user_params
    params.permit(
      :name,
      :email,
      :password,
      :password_confirmation
    )
  end
end