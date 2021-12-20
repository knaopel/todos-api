require 'rails_helper'

RSpec.describe "V1::Passwords", type: :request do
  let!(:user) { create(:user) }

  describe "POST /forgot_password" do
    before do
      post "/forgot_password", :params => { email: user.email }
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /reset_password" do
    before do
      user.send_password_reset
      params = { token: user.password_reset_token, email: user.email, password: Faker::Internet.password }
      post "/reset_password", :params => params
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
  end

end
