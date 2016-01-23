class WelcomeController < ApplicationController
  def index
    @search= Search.new
  end
end
