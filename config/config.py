from dotenv import load_dotenv
from os import getenv

load_dotenv()

SECRECT_KEY = getenv("SECRECT_KEY")
GROCK_API_KEY = getenv("GROCK_API_KEY")