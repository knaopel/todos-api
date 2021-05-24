require 'rails_helper'

RSpec.describe "Dewers", type: :request do
  let!(:user) { create(:user) }
  let(:headers) { valid_headers.except('Authorization') }
  let!(:user2) { create(:user) }
  let!(:user3) { create(:user) }
  let(:valid_credentials) do
    {
      email: user.email,
      password: user.password
    }.to_json
  end
  # Dewers request suite
  describe 'GET /dewers' do
    context 'when there is one dewer' do
      before do
        #log in first user
        post '/auth/login', params: valid_credentials, headers: headers
        headers["Authorization"] = json["auth_token"]
        honey_params = { email: user2.email }.to_json
        # add user 2 as honey
        post '/honeys', params: honey_params, headers: headers
        # log in as second user
        user2_credentials = { email: user2.email, password: user2.password }.to_json
        post '/auth/login', params: user2_credentials, headers: headers
        headers["Authorization"] = json["auth_token"]
        get '/dewers', headers: headers
      end
      it 'returns success status' do
        expect(response).to have_http_status(:ok)
      end
      it 'returns an array with user one' do
        expect(json.count).to eq(1)
        expect(json[0]["email"]).to eq(user.email)
      end
    end

    context 'when there is two dewers' do
      before do
         #log in first user
         post '/auth/login', params: valid_credentials, headers: headers
         headers["Authorization"] = json["auth_token"]
         honey_params = { email: user2.email }.to_json
         # add user2 as honey to user1
         post '/honeys', params: honey_params, headers: headers
         # log in user3
         user3_credentials = { email: user3.email, password: user3.password }.to_json
         post '/auth/login', params: user3_credentials, headers: headers.except('Authorization')
         # add user2 as honey to user3
         headers["Authorization"] = json["auth_token"]
         post '/honeys', params: honey_params, headers: headers
         # login as user2
         user2_credentials = { email: user2.email, password: user2.password }.to_json
         post '/auth/login', params: user2_credentials, headers: headers
         headers["Authorization"] = json["auth_token"]
         get '/dewers', headers: headers
      end
      it 'returns a success status' do
        expect(response).to have_http_status(:ok)
      end
      it 'returns an array of the users 1 and 3' do
        expect(json.count).to eq(2)
        expect(json[0]["email"]).to eq(user.email)
        expect(json[1]["email"]).to eq(user3.email)
      end
    end
  end
end
