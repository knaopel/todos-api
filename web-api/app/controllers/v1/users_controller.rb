module V1
  class UsersController < ApplicationController
    before_action :set_user, only: [:show]

    # GET /user
    def show
      json_response(@user)
    end

     # PUT /user
     def update
      @current_user.update(user_params)
      set_user
      json_response(@user, :accepted)
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