require 'rails_helper'

RSpec.describe Honey, type: :model do
  # Association Test
  it { should belong_to(:honey).class_name('User') }
  it { should belong_to(:dewer).class_name('User') }
end
