# -*- coding: utf-8 -*-
"""
Created on Fri Mar 29 14:46:24 2024

@author: jsyas
"""

import pandas as pd

# Specify the absolute file path
file1_path = 'C:/Users/jsyas/Downloads/ouedkniss_cleaned_version_omg.csv'
file2_path = 'C:/Users/jsyas/Downloads/ouedkniss_cleaned_version_three.csv'

# Read the CSV files into Pandas DataFrames
df1 = pd.read_csv(file1_path)
df2 = pd.read_csv(file2_path)

# Concatenate the DataFrames
merged_df = pd.concat([df1, df2], ignore_index=True)

# Write the merged DataFrame to a new CSV file
merged_df.to_csv('merged_ouedkniss_final.csv', index=False)
