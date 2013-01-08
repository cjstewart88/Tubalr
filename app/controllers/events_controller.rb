class EventsController < ApplicationController
  before_filter :validate_current_user

  def create
    event = JSON.parse(params[:event])
    current_user.events.create(event)
    head 201
  end

  private

  def validate_current_user
    head 403 and return unless user_signed_in?
  end
end