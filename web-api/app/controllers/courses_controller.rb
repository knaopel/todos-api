class CoursesController < ApplicationController
 skip_before_action :authorize_request
 before_action :set_course, only: [:show, :update, :destroy]

  #  GET /courses
  def index
    @courses = Course.all
    json_response(@courses)
  end

  # GET /courses/:id
  def show
    json_response(@course)
  end

  # POST /courses
  def create
    @course = Course.new(course_params)
    slug = @course.title.gsub(/[^a-z0-9_]+/i, "-").gsub(/^-|-$/, "").downcase
    @course.slug = slug
    @course.save
    json_response(@course, :created)
  end

  # PUT /courses/:id
  def update
    @course.update(course_params)
    head :no_content
  end

  def destroy
    @course.destroy
    head :no_content
  end

  private
  def course_params
    params.permit(:title, :slug, :author_id, :category)
  end

  def set_course
    @course = Course.find(params[:id])
  end
end
