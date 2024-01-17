# This python programme is used to simulate user  input
# Put the text for the topic blocks in text.txt
# Put agenda into the list

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

agenda = ["Decide timeline for HCI submission", "Finalise UI design", "Finalise HCI software design"]

def launchSelenium():
    driver = webdriver.Chrome()
    driver.get("http://localhost:3000/")
    return driver


def seleniumCloser(driver):
    input("Press Enter to close the browser...")

    driver.close()

def setAgendaItems(driver, agendalist):
    for i in range(len(agendalist)):
        agenda_field = driver.find_elements(By.CSS_SELECTOR, '[class*="DynamicTextArea_detailBlockInput"]')[i]
        agenda_field.click()
        agenda_field.send_keys(agenda[i])
        agenda_field.send_keys(Keys.ENTER)

def createNewTopicBlock(driver):
    addtopicButton = driver.find_element(By.CSS_SELECTOR, '[class*="DynamicTextArea_mainAreaAddNewBlockButton"]')
    addtopicButton.click()

def newTopicTitle(driver, title):
    addtopic = driver.find_elements(By.CSS_SELECTOR, '[class*="DynamicTextArea_topicBlockTopicInput"]')[-1]
    addtopic.send_keys(title.strip()) 

def textInTopicBlock(driver,text):
    textarea = driver.find_elements(By.CSS_SELECTOR, '[class*="ql-editor"]')[-1]
    for t in text:
        textarea.send_keys(t)

def inputTopicTextFromFile(driver,filepath):
    createNewTopicBlock(driver)
    title = False
    with open(filepath, 'r') as file:
        for line in file:
            if line == '\n':
                createNewTopicBlock(driver)
                title = False
            else:
                if title:
                    textInTopicBlock(driver, line)
                else:
                    newTopicTitle(driver, line)
                    title= True

driver = launchSelenium()
setAgendaItems(driver, agenda)
inputTopicTextFromFile(driver, "text.txt")
seleniumCloser(driver)





# setAgendaItems(agenda)


