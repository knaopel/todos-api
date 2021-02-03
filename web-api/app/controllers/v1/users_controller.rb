module V1
  class UsersController < ApplicationController
    before_action :set_user, only: [:show]
    def show
      json_response(@user)
    end

    private
    def set_user
      @user = {
        name: @current_user.name,
        email: @current_user.email
      }
    end
  end
end 