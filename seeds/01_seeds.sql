-- users seeds
INSERT INTO users (name, email, password) 
  VALUES 
    ('Peter Parker', 'spider@man.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Ask Ketchum', 'pikachu@pokemon.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Fox McCloud', 'shine@20xx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- properties seeds
INSERT INTO properties (owner_id, title, description, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES 
    (1, 'title', 'description', 'https://patch.com/img/cdn20/users/22969720/20180408/124725/styles/raw/public/processed_images/queens_village_2_realtor-1523205742-6452.jpg', 'https://patch.com/img/cdn20/users/22969720/20180408/124725/styles/raw/public/processed_images/queens_village_2_realtor-1523205742-6452.jpg', 500, 2, 2, 2, 'United States', '616 Queen St.', 'New York City', 'New York', '616616', true),
    (2, 'title', 'description', 'https://www.pokemoncenter.com/site/binaries/content/gallery/bloomreach/about/pkmpg_pokemoncenter-story-1.jpg', 'https://www.pokemoncenter.com/site/binaries/content/gallery/bloomreach/about/pkmpg_pokemoncenter-story-1.jpg', 100, 0, 2, 6, 'Kanto', 'Route 2', 'Viridian City', 'Gen 1', '123456', true),
    (3, 'title', 'description', 'https://www.ssbwiki.com/images/thumb/5/50/Corneria_full.jpg/300px-Corneria_full.jpg', 'https://www.ssbwiki.com/images/thumb/5/50/Corneria_full.jpg/300px-Corneria_full.jpg', 2000, 5, 5, 6, 'Japan', 'Space St.', 'Shine City', 'Melee', '20XX', false);

-- reservations seeds
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES 
    ('2018-09-11', '2018-09-26', 1, 3),
    ('2019-01-04', '2019-02-01', 2, 2),
    ('2020-10-01', '2020-10-10', 3, 1);

-- property reviews seeds
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
  VALUES
    (3, 1, 1, 3, 'message'),
    (2, 2, 2, 4, 'message'),
    (1, 3, 3, 5, 'message');