# -*- coding: utf-8 -*-
"""
Created on Tue Apr 30 13:50:35 2024

@author: jsyas
"""

import pandas as pd

#read the csv file into a dataframe
df=pd.read_csv('ouedkniss_cleaned_version_lina.csv', encoding='latin1')

#remove 4-digit numbers from the 'model' column
df['model']=df['model'].str.replace(r'(\b\d{4}\b)(?!.*\b\d{4}\b)', '', regex=True)

#write the modified date frame back to the csv file
df.to_csv('ouedkniss_cleaned_version_omg.csv', index=False)