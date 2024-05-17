# -*- coding: utf-8 -*-
"""
Created on Fri Apr 26 01:09:30 2024

@author: jsyas
"""

import pandas as pd

# Read the CSV file into a DataFrame
df = pd.read_csv('ouedkniss_with_brand_year_lina.csv')

# Delete the first word from the 'model' column
df['model'] = df['model'].str.split(n=1).str[1]

# Write the modified DataFrame back to a new CSV file
df.to_csv('ouedkniss_with_brand_year_lina22.csv', index=False)
