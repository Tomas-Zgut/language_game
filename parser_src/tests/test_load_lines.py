import unittest
from adder import load_lines

class TestLoadingFileData(unittest.TestCase):
    
    def test_nonexistent_file(self):
        with self.assertRaises(SystemExit) as fc:
            load_lines("nn.txt")
        self.assertEqual(fc.exception.code,1)




if __name__ == "__main__":
    unittest.main()