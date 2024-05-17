# -*- coding: utf-8 -*-
"""
Created on Fri Apr 26 01:17:27 2024

@author: jsyas
"""

import pandas as pd

# Read the CSV file into a DataFrame with specified encoding
df = pd.read_csv('ouedknisscleaned.csv', encoding='latin1')

# Extract the year from the 'model' column using regular expressions
df['year'] = df['model'].str.extract(r'(\b\d{4}\b)')



# Write the modified DataFrame back to a new CSV file
df.to_csv('ouedkniss_with_year_lina.csv', index=False)

