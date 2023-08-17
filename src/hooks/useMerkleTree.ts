import { useMemo } from "react";
import { MERKLE_TREE_PATH, MERKLE_TREES } from "../constants";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { useNetwork } from "wagmi";

function useMerkleJson() {
  // TODO: fetch from ipfs
  return useMemo(() => {
    // return JSON.parse(fs.readFileSync(MERKLE_TREE_PATH, "utf-8"))
  }, []);
}

export function useMerkleTree() {
  // const treeJson = useMerkleJson()
  const { chain } = useNetwork();
  return useMemo(() => {
    // if (!treeJson) return
    if (!chain || chain.unsupported) return;
    return StandardMerkleTree.load(MERKLE_TREES[chain.id] as any);
  }, [chain]);
}

export function useMerkleProof(address?: string) {
  const tree = useMerkleTree();
  return useMemo(() => {
    if (!tree || !address) return { loading: true };

    const leaf = Array.from(tree.entries()).find(([i, val]) => {
      return val[0].toLowerCase() === address.toLowerCase();
    });
    if (!leaf) return { found: false };

    return {
      found: true,
      leafIndex: leaf[0],
      amount: BigInt(leaf[1][1]),
      proof: tree.getProof(leaf[0]),
    };
  }, [tree, address]);
}
