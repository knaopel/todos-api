class User < ApplicationRecord
  include Honeyable
  # encrypt password
  has_secure_password

  def first_name
    full_name.split.first
  end

  def send_user_invitation(honey_or_dewer, inviter)
    self.password_reset_token = generate_base64_token
    self.password_reset_sent_at = Time.zone.now
    save!
    UserMailer.invite_user(self, honey_or_dewer, inviter).deliver_now
  end

  def send_password_reset
    # byebug
    self.password_reset_token = generate_base64_token
    self.password_reset_sent_at = Time.zone.now
    save!
    UserMailer.password_reset(self).deliver_now
  end

  def password_token_valid?
    (self.password_reset_sent_at + 1.hour) > Time.zone.now
  end

  def reset_password(password)
    self.password_reset_token = nil
    self.password = password
    save!
  end

  def accept_invitation(name, password)
    self.name = name
    self.password = password
    self.password_reset_sent_at = nil
    self.password_reset_token = nil
    save!
  end

  # Model associations
  has_many :todos

  # Validations
  validates_presence_of :name, :password_digest
  validates :email, presence: true,
    format: { with: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i },
    uniqueness: { case_sensitive: false }

  private

  def generate_base64_token
    test = SecureRandom.urlsafe_base64
  end
end