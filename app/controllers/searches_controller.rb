class SearchesController < ApplicationController


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
           biz_info['address']=business.location.address.first
           biz_info['longitude']=business.location.coordinate.longitude
           biz_info['latitude']=business.location.coordinate.latitude
           # biz_info['rating']=business.rating_image_url
           shops << biz_info
           # p biz_info['rating']
     end

     respond_to do |format|
       data = { :data => shops}
       format.json  { render :json => data }
     end
  end


end
