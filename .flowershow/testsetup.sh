rm content
ln -s tests/fixtures/content content
rm public/assets
ln -s ../tests/fixtures/content/assets public/assets
