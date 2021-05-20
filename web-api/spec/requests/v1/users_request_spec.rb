require 'rails_helper'

RSpec.describe "V1::Users", type: :request do
  let(:user) { build(:user) }
  let(:headers) { valid_v1_headers.except('Authorization') }
  let(:user_attributes) do
    attributes_for(:user, password_confirmation: user.password)
  end

  describe "GET /user" do
    before do
      post '/signup', params: user_attributes.to_json, headers: valid_headers
      headers["Authorization"] = json["auth_token"]
    end
    it "returns http success" do
      get "/user", headers: headers
      expect(response).to have_http_status(:success)
    end
  end

end
