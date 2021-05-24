require 'rails_helper'

RSpec.describe "Honeys API", type: :request do
  let!(:user) { create(:user) }
  let(:honeys_count) { user.honeys_count }
  let(:headers) { valid_headers }
  let!(:user2) { create(:user) }
  let!(:honey_users) { create_list(:user, 5) }

  # Honey GET test Suite
  describe 'GET /honeys' do
    before do
      honey_users.each do |u|
        user.add_honey(u.id)
      end
      # debugger
      get '/honeys', headers: headers
    end
    it 'returns honeys' do
      expect(json).not_to be_empty
      expect(json.size).to eq(5)      
    end
    it 'returns "OK" status code' do
      expect(response).to have_http_status(:ok)
    end
  end

  # Honey add test suite
  describe 'POST /honeys' do
    context 'when user is found' do
      before do
        honey_params = { email: user2.email }.to_json
        post '/honeys', params: honey_params, headers: headers
      end
      it 'returns success status' do
        expect(response).to have_http_status(:ok)
      end
      it 'returns array of honeys with user2' do
        expect(json.count).to eq(1)
        expect(json[0]["email"]).to eq(user2.email)
      end
    end
    context 'when user is not found' do
      before do
        honey_params = { email: Faker::Internet.email }.to_json
        # attempt to add fake user as honey
        post '/honeys', params: honey_params, headers: headers        
      end
      it 'returns a "unprocessable entity" status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
    context 'when user is same user' do
      before do
        honey_params = { email: user.email }.to_json
        # attempt to add same user as honey
        post '/honeys', params: honey_params, headers: headers        
      end
      it 'returns a "unprocessable entity" status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'POST /honeys/exists' do
    
  end
  describe 'DELETE /honeys/:id' do
    
  end
end
