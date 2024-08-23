import logging
import schedule
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import requests
import time
import os as env
from datetime import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

ESV_API_KEY = env.getenv("ESV_API_KEY")
ESV_API_URL = "https://api.esv.org/v3/passage/text/"
SENDER_EMAIL = env.getenv("SENDER_EMAIL")
SENDER_PASSWORD = env.getenv("SENDER_PASSWORD")
RECEIVER_EMAIL = ""

# Setup logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def fetch_scripture_text(passage):
    try:
        logging.debug("Fetching scripture text from ESV API.")
        params = {
            "q": passage,
            "include-footnotes": False,
            "include-headings": False,
            "include-passage-references": False,
            "include-short-copyright": False,
            "include-verse-numbers": True,
        }
        headers = {
            "Authorization": f"Token {ESV_API_KEY}"
        }
        response = requests.get(ESV_API_URL, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()
        logging.debug("Scripture text fetched successfully.")
        return data['passages'][0] if 'passages' in data else "Scripture not found."
    except Exception as e:
        logging.error(f"Error fetching scripture text: {e}")
        return "Error fetching scripture text."

def fetch_and_print_content():
    try:
        logging.debug("Setting up Selenium WebDriver.")
        options = webdriver.ChromeOptions()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")

        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)

        logging.debug("Opening the URL.")
        url = "http://www.duranno.com/livinglife/qt/?OD=" + datetime.now().strftime("%Y-%m-%d")
        driver.get(url)

        time.sleep(5)  # Wait for the page to load

        # Get page source and parse with BeautifulSoup
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        # Extract content sections
        qt_section = soup.find('div', {'class': 'box_layout'})
        today_qt_title = qt_section.find('div', {'class': 'title'}).get_text(strip=True)
        today_qt_subtitle = qt_section.find('div', {'class': 'sub_title'}).get_text(strip=True)

        # Use ESV API for scripture text
        scripture_content = fetch_scripture_text(today_qt_subtitle)

        reflection_section = soup.find_all('div', {'class': 'box_layout'})[2]
        reflection_content = reflection_section.find('div', {'id': 'max_content1'}).get_text(separator="\n", strip=True)

        letter_section = soup.find_all('div', {'class': 'box_layout'})[3]
        letter_content = letter_section.find('div', {'class': 'box_con1'}).get_text(separator="\n", strip=True)

        driver.quit()

        # Format the email content
        email_content = f"Today's QT:\n{today_qt_title}, {today_qt_subtitle}\n\nScripture:\n{scripture_content}\n\nReflection:\n{reflection_content}\n\nLetter to God:\n{letter_content}\n"

        # Send the email
        send_email("Today's QT", email_content)
    except Exception as e:
        logging.error(f"Error fetching and printing content: {e}")

def send_email(subject, body):
    try:
        logging.debug("Preparing the email.")
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'plain'))

        logging.debug("Sending the email.")
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        text = msg.as_string()
        server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, text)
        server.quit()
        logging.info("Email sent successfully!")
    except Exception as e:
        logging.error(f"Failed to send email: {e}")

# Set your desired time here in HH:MM:SS format
scheduled_time = "05:30:00"  # Change this to your desired time

# Schedule the task
schedule.every().day.at(scheduled_time).do(fetch_and_print_content)

logging.debug(f"Task scheduled to run at {scheduled_time}.")

while True:
    schedule.run_pending()
    time.sleep(1)
