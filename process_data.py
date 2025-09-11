import pandas as pd
import json
import numpy as np
import re

def create_web_id(name):
    """
    Creates a URL-friendly ID from the lncRNA name.
    Removes special characters and replaces spaces/slashes with hyphens.
    """
    if not isinstance(name, str):
        return ""
    return re.sub(r'[^a-zA-Z0-9-]', '', name.replace('/', '-').replace(' ', '-').lower())

try:
    # Load the two sheets from the Excel file
    df_list = pd.read_excel('LncRNA-Data.xlsx', sheet_name='LncRNA list')
    df_seq = pd.read_excel('LncRNA-Data.xlsx', sheet_name='Sequence')
    print("Excel sheets loaded successfully.")
except FileNotFoundError:
    print("Error: 'LncRNA-Data.xlsx' not found. Please ensure the file is in the correct directory.")
    exit()

# Prepare the sequence data for merging
# Clean up column names by stripping whitespace
df_seq.columns = [col.strip() for col in df_seq.columns]
df_seq = df_seq.rename(columns={'lncRNA': 'Name'})

# --- FIX ---
# The original code failed because the 'Name' column in the 'Sequence' sheet
# contained duplicate values (e.g., 'LINC00668'), which cannot be used to
# create a unique index. The following line resolves this by dropping
# duplicate entries based on the 'Name' column, keeping the first occurrence.
df_seq.drop_duplicates(subset='Name', keep='first', inplace=True)
# --- END FIX ---

# Now that the 'Name' column is unique, we can safely create the dictionary
seq_dict = df_seq.set_index('Name').to_dict(orient='index')

merged_data = []

# Iterate through the main list and merge data
for _, row in df_list.iterrows():
    record = row.to_dict()
    # Replace numpy.nan with None for clean JSON output
    record = {k: (v if pd.notna(v) else None) for k, v in record.items()}

    name_key = record.get('Name')
    if not name_key:
        continue

    # Attempt to find a matching sequence record
    seq_data = None
    # Try matching the full name
    if name_key in seq_dict:
        seq_data = seq_dict[name_key]
    else:
        # If no direct match, try matching the part before a '/'
        base_name = name_key.split('/')[0].strip()
        if base_name in seq_dict:
            seq_data = seq_dict[base_name]

    # Add sequence and reference information if a match was found
    if seq_data:
        record['Sequence'] = seq_data.get('Sequence')
        record['Length'] = seq_data.get('Length')
        
        # Merge DOI, prioritizing existing DOI and handling multiple DOIs
        seq_doi = seq_data.get('DOI')
        list_doi = record.get('DOI')
        
        if pd.notna(seq_doi) and pd.notna(list_doi):
            # Combine if they are different, avoiding duplicates
            if str(seq_doi).strip() != str(list_doi).strip():
                record['DOI'] = f"{list_doi}, {seq_doi}"
        elif pd.notna(seq_doi):
            record['DOI'] = seq_doi

    # Create a unique, URL-safe ID for each entry
    record['id'] = create_web_id(name_key)
    merged_data.append(record)

# Save the final merged data to a JSON file
output_filename = 'lncrna_data.json'
with open(output_filename, 'w') as f:
    json.dump(merged_data, f, indent=4)

print(f"Successfully merged data and created '{output_filename}'")
