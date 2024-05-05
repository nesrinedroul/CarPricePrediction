# -*- coding: utf-8 -*-
"""
Created on Tue Apr 30 15:03:36 2024

@author: jsyas
"""

import pandas as pd
df=pd.read_csv('ouedkniss_with_brand_year_lina22.csv')
df['model']=df['model'].apply(lambda x: ' '.join(sorted(set(str(x).split()))))
df.to_csv('ouedkniss_cleaned_version_lina.csv', index=False)                           