class V1::Users::FollowsController < ApplicationController
  before_action :set_user, only: [:create, :destroy]

  # GET /followers
  def index2
    json_response(current_user.followers)
  end

  # GET /following
  def index
    @following = current_user.following
    json_response(@following)
  end

  # POST /exists
  def check_follower
    email = params[:email]
    @user = User.find_by_email(email)
    if @user
      json_response({exists: true})
    else
      json_response({exists: false, searched_email: email})
    end
  end

  # POST /follow
  def create
    logger.info params[:email]
    if current_user.follow(@user.id)
      @user.reload
      json_response(current_user.following)
    end    
  end

  # DELETE /unfollow
  def destroy
    if current_user.unfollow(@user.id)
      @user.reload
      json_response(current_user.following)
    end
  end

  private

  def set_user
    email = params[:email]
    # console.log(email)
    @user = User.find_by_email(params[:email])
  end
end