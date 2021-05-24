require 'rails_helper'

RSpec.describe "Dewers", type: :request do
  let!(:user) { create(:user) }
  let!(:user2) { create(:user) }
  let!(:user3) { create(:user) }
  let(:headers) { valid_headers }
  # Dewers request suite
  describe 'GET /dewers' do
    context 'when there is one dewer' do
      before do
        user2.add_honey(user.id)
        get '/dewers', headers: headers
      end
      it 'returns success status' do
        expect(response).to have_http_status(:ok)
      end
      it 'returns an array with user2' do
        expect(json.count).to eq(1)
        expect(json[0]["email"]).to eq(user2.email)
      end
    end

    context 'when there are two dewers' do
      before do
        # add user as honey for user2 and user3
        user2.add_honey(user.id)
        user3.add_honey(user.id)
        get '/dewers', headers: headers
      end
      it 'returns a success status' do
        expect(response).to have_http_status(:ok)
      end
      it 'returns an array of the users 2 and 3' do
        expect(json.count).to eq(2)
        expect(json[0]["email"]).to eq(user2.email)
        expect(json[1]["email"]).to eq(user3.email)
      end
    end
  end
end
