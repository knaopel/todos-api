class V1::HoneysController < ApplicationController
  before_action :set_user, only: [:create, :check_honey]

  # GET /honeys
  def index
    json_response(current_user.honeys)
  end

  # POST /honeys/exists
  def check_honey
    if @user
      json_response({exists: true})
    else
      json_response({exists: false, searched_for_email: @email}, 422)
    end
  end

  # POST /honeys
  def create
    if @user
      if current_user.id == @user.id or current_user.is_honey?(@user.id)
        json_response(current_user.honeys, 422)
      else
        if current_user.add_honey(@user.id)
          json_response(current_user.honeys)
        else
          json_response({error:"Could not add honey"}, 500)
        end
      end
    else
      json_response({error: "user not found"}, 422)
    end
  end

  # DELETE /honeys/:id
  def destroy
    if current_user.unhoney(params[:id])
      head :no_content
    end
  end

  private

  def set_user
    @email = params[:email]
    @user = User.find_by_email(@email)
  end
end
