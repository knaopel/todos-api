require 'rails_helper'

RSpec.describe "V1::Passwords", type: :request do
  describe "GET /reset" do
    it "returns http success" do
      get "/v1/passwords/reset"
      expect(response).to have_http_status(:success)
    end
  end

end
