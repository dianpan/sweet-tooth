class SearchesController < ApplicationController

  def index
  end

  def create
    long = params[:location][:longitude]
    lat = params[:location][:latitude]
     coordinates = { latitude: lat.to_f, longitude: long.to_f }
     params = { term: 'ice cream',
                radius_filter: 800
              }
     shops = []
     Yelp.client.search_by_coordinates(coordinates,params).businesses.each do |business|
           biz_info = {}
           biz_info['name']=business.name
           biz_info['phone']=business.phone
           shops << biz_info
     end

     respond_to do |format|
       data = { :data => shops}
       format.json  { render :json => data }
     end
  end

  def show
  end

end
