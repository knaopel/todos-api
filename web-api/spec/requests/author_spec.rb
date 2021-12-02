require 'rails_helper'

RSpec.describe "Authors", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/author/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/author/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/author/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/author/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/author/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
