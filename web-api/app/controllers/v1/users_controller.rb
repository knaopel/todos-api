module V1
  class UsersController < ApplicationController
    before_action :set_user, only: [:show]

    # GET /user
    def show
      json_response(@user)
    end

    # POST /user/invite
    def invite
      email = params[:email]
      honey_or_dewer = params[:honey_or_dewer]
      random_pwd = SecureRandom.hex(8)
      user = User.create!({ email: email, password: random_pwd, name: "Invited" })
      if honey_or_dewer == "honey"
        @current_user.add_honey(user.id)
      elsif honey_or_dewer == "dewer"
        @current_user.add_dewer(user.id)
      end
      user.send_user_invitation(honey_or_dewer, @current_user)
      json_response({message:'Invited', user: user})
    end

     # PUT /user
     def update
      @current_user.update(user_params)
      set_user
      json_response(@user, :accepted)
    end

    # POST /user/exists
    def check_user
      email = params[:email]
      @user = User.find_by_email(email);
      if @user
        json_response({exists: true, user: @user})
      else
        json_response({exists:false,searched_for_email: email})
      end
    end

    private

    def user_params
      # whitelist params
      params.permit(:name, :email)
    end

    def set_user
      @user = {
        name: @current_user.name,
        email: @current_user.email
      }
    end
  end
end 