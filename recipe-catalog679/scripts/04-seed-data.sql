-- Insert sample data

-- Insert sample recipes (you'll need to replace user_id with actual user IDs after authentication)
INSERT INTO recipes (title, description, image_url, prep_time, cook_time, servings, difficulty, type, instructions, user_id) VALUES
('Bolo de Chocolate Fitness', 'Delicioso bolo de chocolate sem açúcar, perfeito para quem está na dieta', '/placeholder.svg?height=300&width=400', 15, 30, 8, 'easy', 'fitness', 'Misture todos os ingredientes secos. Adicione os líquidos e mexa bem. Asse por 30 minutos a 180°C.', '00000000-0000-0000-0000-000000000000'),
('Lasanha de Berinjela', 'Lasanha saudável substituindo a massa por berinjela', '/placeholder.svg?height=300&width=400', 30, 45, 6, 'medium', 'salgado', 'Corte as berinjelas em fatias. Monte as camadas alternando berinjela, molho e queijo. Asse por 45 minutos.', '00000000-0000-0000-0000-000000000000'),
('Brigadeiro Gourmet', 'Brigadeiro tradicional com toque especial', '/placeholder.svg?height=300&width=400', 10, 15, 20, 'easy', 'doce', 'Misture leite condensado, chocolate em pó e manteiga. Cozinhe mexendo sempre até desgrudar da panela.', '00000000-0000-0000-0000-000000000000');

-- Insert sample ingredients
INSERT INTO ingredients (recipe_id, name, quantity, unit) VALUES
((SELECT id FROM recipes WHERE title = 'Bolo de Chocolate Fitness' LIMIT 1), 'Farinha de aveia', '2', 'xícaras'),
((SELECT id FROM recipes WHERE title = 'Bolo de Chocolate Fitness' LIMIT 1), 'Cacau em pó', '1/2', 'xícara'),
((SELECT id FROM recipes WHERE title = 'Bolo de Chocolate Fitness' LIMIT 1), 'Adoçante', '1', 'xícara'),
((SELECT id FROM recipes WHERE title = 'Bolo de Chocolate Fitness' LIMIT 1), 'Ovos', '3', 'unidades'),

((SELECT id FROM recipes WHERE title = 'Lasanha de Berinjela' LIMIT 1), 'Berinjelas grandes', '2', 'unidades'),
((SELECT id FROM recipes WHERE title = 'Lasanha de Berinjela' LIMIT 1), 'Molho de tomate', '500', 'ml'),
((SELECT id FROM recipes WHERE title = 'Lasanha de Berinjela' LIMIT 1), 'Queijo mussarela', '300', 'g'),
((SELECT id FROM recipes WHERE title = 'Lasanha de Berinjela' LIMIT 1), 'Carne moída', '500', 'g'),

((SELECT id FROM recipes WHERE title = 'Brigadeiro Gourmet' LIMIT 1), 'Leite condensado', '1', 'lata'),
((SELECT id FROM recipes WHERE title = 'Brigadeiro Gourmet' LIMIT 1), 'Chocolate em pó', '3', 'colheres de sopa'),
((SELECT id FROM recipes WHERE title = 'Brigadeiro Gourmet' LIMIT 1), 'Manteiga', '1', 'colher de sopa'),
((SELECT id FROM recipes WHERE title = 'Brigadeiro Gourmet' LIMIT 1), 'Chocolate granulado', '100', 'g');
