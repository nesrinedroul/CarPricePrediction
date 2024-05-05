# -*- coding: utf-8 -*-
"""
Created on Fri Apr 26 01:01:04 2024

@author: jsyas
"""

import pandas as pd

# Read the CSV file into a DataFrame
df = pd.read_csv('ouedkniss_with_year_lina.csv')

# Extract the first word from the 'model' column
df['brand'] = df['model'].str.split().str[0]

# Write the modified DataFrame back to a new CSV file
df.to_csv('ouedkniss_with_brand_year_lina.csv', index=False)
