require 'rails_helper'

RSpec.describe 'V1::Dewers', type: :request do
  let!(:user) { create(:user) }
  let!(:user2) { create(:user) }
  let!(:user3) { create(:user) }
  let(:headers) { valid_headers }

  # Dewers request suite
  describe 'GET /dewers' do
    context 'when there is one dewer' do
      before do
        user.add_dewer(user2.id)
        get '/dewers', headers: headers
      end
      it 'returns success status' do
        expect(response).to have_http_status(:ok)
      end
      it 'returns an array with user2' do
        expect(json.count).to eq(1)
        expect(json[0]['email']).to eq(user2.email)
      end
    end

    context 'when there are two dewers' do
      before do
        user.add_dewer(user2.id)
        user.add_dewer(user3.id)
        get '/dewers', headers: headers
      end
      it 'returns a success status' do
        expect(response).to have_http_status(:ok)
      end
      it 'returns an array of the users 2 and 3' do
        expect(json.count).to eq(2)
        expect(json[0]['email']).to eq(user2.email)
        expect(json[1]['email']).to eq(user3.email)
      end
    end
  end

  describe 'POST /dewers' do
    context 'when dewer is not found' do
      before do
        @num_dewers = user.dewers_count
        post '/dewers',
             params: { email: Faker::Internet.email }.to_json,
             headers: valid_v1_headers
      end
      it 'returns http unprocessable_entity status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it 'dewers_count is unchanged' do
        user_subject = User.find(user.id)
        expect(user_subject.dewers_count).to eq(@num_dewers)
      end
    end

    context 'when dewer is user' do
      before do
        @num_dewers = user.dewers_count
        post '/dewers',
             params: { email: user2.email }.to_json,
             headers: valid_v1_headers
      end
      it 'returns http ok status' do
        expect(response).to have_http_status(:ok)
      end
      it 'dewers_count is incresed by one' do
        user_subject = User.find(user.id)
        expect(user_subject.dewers_count).to eq(@num_dewers + 1)
      end
    end
  end
end
