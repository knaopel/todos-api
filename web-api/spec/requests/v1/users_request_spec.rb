require 'rails_helper'

RSpec.describe 'V1::Users', type: :request do
  let!(:user) { create(:user) } # subject user
  let(:user_signup) { build(:user) } # user for signing up
  let(:user_to_invite) { build(:user) }
  let(:user_existing) { create(:user) } # existing user in DB
  let(:headers) { valid_v1_headers.except('Authorization') }
  let(:valid_signup_attributes) do
    attributes_for(:user, password: user_signup.password)
  end

  let(:valid_invite_attributes) do
    attributes_for(:user, email: user_to_invite.email)
  end
  let(:invalid_invite_attributes) do
    attributes_for(:user, email: user_existing.email)
  end

  # User signup test suite
  describe 'POST /signup' do
    context 'when valid request' do
      before do
        post '/signup',
             params: valid_signup_attributes.to_json,
             headers: headers
      end

      it 'creates a new user' do
        expect(response).to have_http_status(201)
      end

      it 'returns a success message' do
        expect(json['message']).to match(/Account created successfully/)
      end

      it 'returns an authentication token' do
        expect(json['auth_token']).not_to be_nil
      end
    end

    context 'when invalid request' do
      before { post '/signup', params: {}, headers: headers }

      it 'does not create a new user' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(json['message']).to match(
          /Validation failed: Password can't be blank, Name can't be blank, Password digest can't be blank, Email can't be blank, Email is invalid/,
        )
      end
    end
  end

  describe 'POST /user/invite' do
    context 'when inviting a new user' do
      context 'as a dewer' do
        before do
          @num_dewers = user.dewers_count
          valid_invite_attributes['honey_or_dewer'] = 'dewer'
          post '/user/invite',
               params: valid_invite_attributes.to_json,
               headers: valid_headers
        end
        it 'returns http success' do
          expect(response).to have_http_status(:success)
        end
        it 'adds to dewers_count' do
          subject_user = User.find(user.id)
          expected_num_dewers = @num_dewers + 1
          expect(subject_user.dewers_count).to eq(expected_num_dewers)
        end
      end
      context 'as a honey' do
        before do
          @num_honeys = user.honeys_count
          valid_invite_attributes['honey_or_dewer'] = 'honey'
          post '/user/invite',
               params: valid_invite_attributes.to_json,
               headers: valid_headers
        end
        it 'returns http success' do
          expect(response).to have_http_status(:success)
        end
        it 'adds to honeys_count' do
          subject_user = User.find(user.id)
          expected_num_honeys = @num_honeys + 1
          expect(subject_user.honeys_count).to eq(expected_num_honeys)
        end
      end
    end
    context 'when inviting a pre-existing user' do
      context 'as a dewer' do
        before do
          @num_dewers = user.dewers_count
          invalid_invite_attributes['honey_or_dewer'] = 'dewer'
          post '/user/invite',
               params: invalid_invite_attributes.to_json,
               headers: valid_v1_headers
        end
        it 'returns an unprocessable_entity' do
          expect(response).to have_http_status(:unprocessable_entity)
        end
        it 'number of dewers is unchanged' do
          subject_user = User.find(user.id)
          expect(subject_user.dewers_count).to eq(@num_dewers)
        end
      end
      context 'as a honey' do
        before do
          @num_honeys = user.honeys_count
          invalid_invite_attributes['honey_or_dewer'] = 'honey'
          post '/user/invite',
               params: invalid_invite_attributes.to_json,
               headers: valid_v1_headers
        end
        it 'returns an unprocessable_entity' do
          expect(response).to have_http_status(:unprocessable_entity)
        end
        it 'number of honeys is unchanged' do
          subject_user = User.find(user.id)
          expect(subject_user.honeys_count).to eq(@num_honeys)
        end
      end
    end
  end

  # User invitation test suite
  describe 'POST /acceptinvitation' do
    context 'when correct user' do
      before do
        valid_invite_attributes['honey_or_dewer'] = 'honey'
        post '/user/invite',
             params: valid_invite_attributes.to_json,
             headers: valid_v1_headers
        subject_user = User.find_by_email(user_to_invite.email)
        token = subject_user.password_reset_token
        attributes = {
          token: token,
          name: user_to_invite.name,
          password: user_to_invite.password,
        }
        post '/acceptinvitation',
             params: attributes.to_json,
             headers: valid_v1_headers.except('Authorization')
      end
      it 'returns http success' do
        expect(response).to have_http_status(:success)
      end
      it 'returns auth_token' do
        expect(json['auth_token']).not_to be_nil
      end
    end
    context 'when wrong user' do
      it 'returns http unprocessable_entity status' do
        params = {
          token: 'abc123',
          name: 'William Seymour',
          password: Faker::Internet.password,
        }
        post '/acceptinvitation',
             params: params.to_json,
             headers: valid_v1_headers.except('Authorization')
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  # user details test suite
  describe 'GET /user' do
    it 'returns http success' do
      get '/user', headers: valid_headers
      expect(response).to have_http_status(:success)
    end
  end
end
