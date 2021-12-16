class V1::DewersController < ApplicationController
  before_action :set_user, only: [:create]
  # GET /dewers
  def index
    json_response(current_user.dewers)
  end

  # POST /dewers
  def create
    if @user
      if current_user.id == @user.id or current_user.has_dewer?(@user.id)
        json_response(current_user.dewers, :unprocessable_entity)
      else
        if current_user.add_dewer(@user.id)
          json_response(current_user.dewers)
        else
          json_response({error: "Could not add dewer"}, :internal_server_error)
        end
      end
    else
      json_response({error:"User not found"},:unprocessable_entity)
    end
  end

  private
  def set_user
    @email = params[:email]
    @user = User.find_by_email(@mail)
  end

  def has_dewer?(id)
    current_user.dewers.each do |d|
      if d.id == id
        return true
      end
    end
    return false
  end
end
