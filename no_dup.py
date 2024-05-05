# -*- coding: utf-8 -*-
"""
Created on Thu Apr 25 23:06:05 2024

@author: jsyas
"""

import pandas as pd

# Read the CSV file into a DataFrame
df = pd.read_csv('ouedknisscl.csv')

# Convert 'price' column to numeric
df['price'] = pd.to_numeric(df['price'], errors='coerce')

# Delete rows where price equals 1, is empty, or is less than 10
df = df[(df['price'] != 1) & (df['price'].notna()) & (df['price'] >= 10)]

# Write the modified DataFrame back to a new CSV file
df.to_csv('ouedkniss_no_price_less_than_10.csv', index=False)
