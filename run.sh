echo "Installing.."

# Update run to last version
git pull

sudo apt-get install python-virtualenv
virtualenv -p python3 venv

source venv/bin/activate
venv/bin/pip install pymongo
