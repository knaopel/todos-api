require 'rails_helper'

RSpec.describe 'V2::Todos', type: :request do
  let(:user) { create(:user) }
  describe 'GET /todos' do
    it 'returns a sub message' do
      get '/todos', headers: valid_v2_headers
      expect(json['message']).to eq('Hello There!')
    end
  end
end
