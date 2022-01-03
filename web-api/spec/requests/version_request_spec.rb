require 'rails_helper'

RSpec.describe 'API Versions', type: :request do
  let(:user) { create(:user) }
  let!(:todos) { create_list(:todo, 10, user_id: user.id) }
  let(:todo_id) { todos.first.id }

  # let(:headers) { valid_headers.except('Authorization') }
  # let(:valid_attributes) do
  #   attributes_for(:user, password: user.password, password_confirmation: user.password)
  # end

  describe 'GET /todos' do
    context 'when v2 specified' do
      before { get '/todos', headers: valid_v2_headers }

      it 'returns stub message' do
        expect(json['message']).to match(/Hello There!/)
      end
    end

    context 'when v1 specified' do
      before { get '/todos', headers: valid_v1_headers }

      it 'returns set of todos' do
        expect(response).to have_http_status(:ok)
        expect(json).not_to be_empty
        expect(json.size).to eq(10)
      end
    end

    context 'when none specified' do
      before { get '/todos', headers: valid_headers }

      it 'returns set of todos' do
        expect(response).to have_http_status(:ok)
        expect(json).not_to be_empty
        expect(json.size).to eq(10)
      end
    end
  end
end
