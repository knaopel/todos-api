module V1
  class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update]

    # GET /user
    def show
      json_response(@user)
    end

     # PUT /user
     def update
      @current_user.update(user_params)
      head :no_content
    end

    private

    def user_params
      # whitelist params
      params.permit(:name, :email)
    end

    def set_user
      @user = {
        id: @current_user.id
        name: @current_user.name,
        email: @current_user.email
      }
    end
  end
end 