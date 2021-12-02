require 'rails_helper'

RSpec.describe "Courses", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/course/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/course/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/course/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/course/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/course/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
