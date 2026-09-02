import os
import glob
import shutil
from string import Template
from src.py import rjsmin
from dotenv import load_dotenv
import os
from bs4 import BeautifulSoup
import subprocess

load_dotenv() # Load environment variables from .env

GTAG_ID = os.getenv("GTAGID")

FROM_DIR="src"
TO_DIR="public"

FILES=[
  "*.html",
  "favicon.ico",
  "sitemap.xml",
  "robots.txt",
  "css/*.css",
  "js/*.js",  # we will be minimizing javascript files ourselves
  "libs/**/*",
  "images/*",  # We expect a flat directory of images
  "Prachi_Saibewar_Resume.pdf",  # The main star! Resume PDF
]

GTAG_URL = Template("https://www.googletagmanager.com/gtag/js?id=$gtagid")
GTAG_CODE = Template("""
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '$gtagid');
""")

def minify_js_with_mangling(js_code):
    try:
        # Execute UglifyJS with mangling options
        # --mangle: enables mangling
        # --compress: enables various code optimizations
        # --toplevel: mangle top-level names
        result = subprocess.run(
            ['uglifyjs', '--mangle', '--compress', '--toplevel'],
            input=js_code.encode('utf-8'),  # Encode input to bytes
            capture_output=True,
            check=True
        )
        return result.stdout.decode('utf-8')  # Decode output to string
    except subprocess.CalledProcessError as e:
        print(f"Error during minification: {e}")
        print(f"Stderr: {e.stderr.decode('utf-8')}")
        return None

# Mainly just adding a header tag to all html files to track gtag stuff
def BundleHtmlFile(input_file: str, dest_path: str) -> bool:
  if input_file[-5:] != ".html":
    return False

  # Don't do anything if we don't have the gtag
  if not GTAG_ID:
    print("No GTAG_ID found, skipping gtag addition")
    return False

  # Load the HTML file
  print("Adding gtag to HTML")
  with open(input_file, "r") as f:
      soup = BeautifulSoup(f, 'html.parser')

  head_tag = soup.head

  # Update element content or attributes
  filled_url = GTAG_URL.substitute(gtagid=GTAG_ID)
  filled_code = GTAG_CODE.substitute(gtagid=GTAG_ID)
  script_tag = soup.new_tag("script", src=filled_url)
  script_tag["async"] = True
  head_tag.append(script_tag)
  filled_code_tag = soup.new_tag("script")
  filled_code_tag.string = filled_code
  head_tag.append(filled_code_tag)
  soup.smooth()
  print(f"Added gtag to {input_file}")

  # Save the modified HTML
  with open(dest_path, "w") as f:
      f.write(soup.prettify())

  return True
  

# Minimizes and writes javascript files. Returns false if not a 
# js file or any other error.
def BundleJsFile(input_file: str, dest_path: str) -> bool:
  if input_file[-3:] != ".js":
    return False
  print("Minimizing JS")
  dest_path = dest_path[:-2] + "min.js"
  with open(input_file, 'r') as file:
    file_content = file.read()
  min_js_content = minify_js_with_mangling(file_content)
  if not min_js_content:
    print(f"Failed to minify {input_file}")
    return False
  with open(dest_path, 'w') as new_file:
    new_file.write(min_js_content)
  print(f"Wrote min file {dest_path}")
  print(f"Saved {int((len(file_content)-len(min_js_content))/len(file_content) * 100)}% of space")
  return True

if __name__ == "__main__":
  # clear the destination folder
  if os.path.exists(TO_DIR):
    shutil.rmtree(TO_DIR)
  os.makedirs(TO_DIR, exist_ok=True)
  for pattern in FILES:
    source_path = os.path.join(FROM_DIR, pattern)
    
    # Expand the glob pattern to get a list of files/directories
    files = glob.glob(source_path, recursive=True)
    
    for file in files:
      dest_path = os.path.join(TO_DIR, os.path.relpath(file, FROM_DIR))
      
      if os.path.isfile(file):
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)

        done_file = False
        # Special bundling functions. Functions should take in file str, output
        # file str, and return a bool saying if it completed successfullt
        for func in [BundleJsFile, BundleHtmlFile]:
          if func(file, dest_path):
            done_file = True
            break

        if done_file:
          continue
          
        # Ensure the destination directory exists
        shutil.copy2(file, dest_path)  # copy with metadata
        print(f"Copied file: {file} to {dest_path}")
      elif os.path.isdir(file):
        # Ensure the destination directory exists
        os.makedirs(dest_path, exist_ok=True)
        # Use copytree to copy the directory structure and files
        shutil.copytree(file, dest_path, dirs_exist_ok=True)
        print(f"Copied directory: {file} to {dest_path}")