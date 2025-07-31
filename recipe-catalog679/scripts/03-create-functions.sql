-- Create useful functions and views

-- Function to get recipe with average rating
CREATE OR REPLACE FUNCTION get_recipe_with_rating(recipe_uuid UUID)
RETURNS TABLE (
  id UUID,
  title VARCHAR,
  description TEXT,
  image_url TEXT,
  prep_time INTEGER,
  cook_time INTEGER,
  servings INTEGER,
  difficulty VARCHAR,
  type VARCHAR,
  instructions TEXT,
  created_at TIMESTAMPTZ,
  user_id UUID,
  avg_rating NUMERIC,
  total_ratings BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.title,
    r.description,
    r.image_url,
    r.prep_time,
    r.cook_time,
    r.servings,
    r.difficulty,
    r.type,
    r.instructions,
    r.created_at,
    r.user_id,
    COALESCE(AVG(rt.rating), 0) as avg_rating,
    COUNT(rt.rating) as total_ratings
  FROM recipes r
  LEFT JOIN ratings rt ON r.id = rt.recipe_id
  WHERE r.id = recipe_uuid
  GROUP BY r.id, r.title, r.description, r.image_url, r.prep_time, r.cook_time, 
           r.servings, r.difficulty, r.type, r.instructions, r.created_at, r.user_id;
END;
$$ LANGUAGE plpgsql;

-- Create view for recipes with ratings
CREATE OR REPLACE VIEW recipes_with_ratings AS
SELECT 
  r.*,
  COALESCE(AVG(rt.rating), 0) as avg_rating,
  COUNT(rt.rating) as total_ratings
FROM recipes r
LEFT JOIN ratings rt ON r.id = rt.recipe_id
GROUP BY r.id;
